provider "proxmox" {}
provider "talos" {}

terraform {
  required_providers {
    proxmox = {
      source  = "bpg/proxmox"
      version = "0.38.1"
    }
    talos = {
      source  = "siderolabs/talos"
      version = "0.3.2"
    }
  }
}
