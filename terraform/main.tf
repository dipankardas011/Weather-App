terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = ""
}

resource "azurerm_resource_group" "example-rg" {
  name     = "weatherappp-${random_integer.ri.result}"
  location = "eastus"
}

resource "random_integer" "ri" {
  min = 10000
  max = 99999
}

resource "azurerm_service_plan" "example-serviceplan" {
  name                = "weatherapp-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.example-rg.name
  location            = azurerm_resource_group.example-rg.location
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "example-web" {
  name                = "web-adfsd2334440009"
  resource_group_name = azurerm_resource_group.example-rg.name
  location            = azurerm_service_plan.example-serviceplan.location
  service_plan_id     = azurerm_service_plan.example-serviceplan.id

  site_config {
    application_stack {
      docker_image = "dipugodocker/weatherapp"
      docker_image_tag = "v3"
    }
  }
}