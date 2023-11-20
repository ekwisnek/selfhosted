# Proxmox #######################
proxmox_hostname                = "192.168.1.94"
proxmox_ssh_key_path            = "/mnt/c/Users/evank/.ssh/id_ecdsa"
proxmox_resource_pool           = "Kubernetes-Stable"
# Talos #########################
talos_image_node_name           = "prox-04"
talos_virtual_ip                = "192.168.1.200"
talos_disable_flannel           = true
# Kubernetes ####################
kubernetes_cluster_name         = "talos-stable"
# Controlplanes #################
controlplane_vmid_prefix        = "402"               # 4011-4019
controlplane_node_name          = "prox-04"
controlplane_hostname_prefix    = "talos-cp"
controlplane_ip_prefix          = "192.168.1.10"      # 11-19
controlplane_mac_address_prefix = "00:00:00:00:00:1"  # 00:11 - 00:19
controlplane_tags               = [
  "app-kubernetes",
  "clusterid-stable",
  "type-controlplane"
]
# Worker Nodes ##################
workernode_vmid_prefix          = "403"               # 4021-4029
workernode_node_name            = "prox-04"
workernode_hostname_prefix      = "talos-wk"
workernode_ip_prefix            = "192.168.1.20"      # 21-29
workernode_mac_address_prefix   = "00:00:00:00:00:2"  # 00:21 - 00:29
workernode_tags                 = [
  "app-kubernetes",
  "clusterid-stable",
  "type-workernode"
]
