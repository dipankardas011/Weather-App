terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
  backend "remote" {
    # The name of your Terraform Cloud organization.
    organization = "weather-org"
    # The name of the Terraform Cloud workspace to store Terraform state files in.
    workspaces {
      name = "Weather-App"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example-rg" {
  name     = "weather-app"
  location = "eastus"
}

resource "azurerm_service_plan" "example-serviceplan" {
  name                = "weather-app-service-plan"
  resource_group_name = azurerm_resource_group.example-rg.name
  location            = azurerm_resource_group.example-rg.location
  os_type             = "Linux"
  sku_name            = "F1"
}

resource "azurerm_linux_web_app" "example-web" {
  name                = "weather-app-01"
  resource_group_name = azurerm_resource_group.example-rg.name
  location            = azurerm_service_plan.example-serviceplan.location
  service_plan_id     = azurerm_service_plan.example-serviceplan.id

  site_config {
    application_stack {
      docker_image     = "dipugodocker/weatherapp"
      docker_image_tag = "v3"
    }
    use_32_bit_worker = true
    always_on         = false
  }
}
