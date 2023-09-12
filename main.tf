terraform {
  required_providers {
    basistheory = {
      source  = "basis-theory/basistheory"
      version = ">= 0.8.0"
    }
  }
}

variable "management_api_key" {}

provider "basistheory" {
  api_key = var.management_api_key
}

resource "basistheory_application" "backend_application" {
  name = "Backend"
  type = "private"
  rule {
    description = "Use tokens"
    priority    = 1
    container   = "/"
    transform   = "reveal"
    permissions = [
      "token:use"
    ]
  }
}

resource "basistheory_reactor_formula" "mutual_auth_formula" {
  type        = "private"
  name        = "Mutual Authentication Formula"
  description = "Uses two-way SSL to connect to endpoints"
  code        = file("./reactor.js")

  request_parameter {
    type        = "string"
    name        = "token"
    description = "Sample request parameter"
  }

  configuration {
    type        = "string"
    name        = "CLIENT_CERTIFICATE"
    description = "Two-Way SSL Client Certificate PEM"
  }

  configuration {
    type        = "string"
    name        = "CLIENT_CERTIFICATE_KEY"
    description = "Two-Way SSL Client Certificate Private Key PEM"
  }
}

resource "basistheory_reactor" "mutual_auth_reactor" {
  formula_id        = basistheory_reactor_formula.mutual_auth_formula.id
  name              = "Mutual Authentication Reactor"
  configuration = {
    CLIENT_CERTIFICATE = file("./test/fixtures/client-cert.pem")
    CLIENT_CERTIFICATE_KEY = file("./test/fixtures/client-key.pem")
  }
}

## OUTPUTS
output "backend_application_key" {
  value       = basistheory_application.backend_application.key
  description = "Backend Application Key"
  sensitive   = true
}

output "mutual_auth_reactor_id" {
  value = basistheory_reactor.mutual_auth_reactor.id
}
