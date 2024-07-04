# Initialize Vault and Join Raft Members

Docs: https://developer.hashicorp.com/vault/docs/platform/k8s/helm/examples/ha-with-raft

Initialize first pod:

```
kubectl exec -ti vault-0 -- vault operator init
```

Output:

```
Unseal Key 1: <key>
Unseal Key 2: <key>
Unseal Key 3: <key>
Unseal Key 4: <key>
Unseal Key 5: <key>

Initial Root Token: <root-token>

Vault initialized with 5 key shares and a key threshold of 3. Please securely
distribute the key shares printed above. When the Vault is re-sealed,
restarted, or stopped, you must supply at least 3 of these keys to unseal it
before it can start servicing requests.

Vault does not store the generated root key. Without at least 3 keys to
reconstruct the root key, Vault will remain permanently sealed!

It is possible to generate new unseal keys, provided you have a quorum of
existing unseal keys shares. See "vault operator rekey" for more information.
```

Unseal Vault (x3):

```
kubectl exec -ti vault-0 -- vault operator unseal
Unseal Key (will be hidden): 
Key                Value
---                -----
Seal Type          shamir
Initialized        true
Sealed             true
Total Shares       5
Threshold          3
Unseal Progress    1/3
Unseal Nonce       17c2c808-16c4-2d4d-d1be-bee521d76187
Version            1.14.0
Build Date         2023-06-19T11:40:23Z
Storage Type       raft
HA Enabled         true
```
Join other Raft Nodes (Pods):

```
kubectl exec -ti vault-1 -- vault operator raft join http://vault-0.vault-internal:8200
kubectl exec -ti vault-1 -- vault operator unseal

kubectl exec -ti vault-2 -- vault operator raft join http://vault-0.vault-internal:8200
kubectl exec -ti vault-2 -- vault operator unseal
```