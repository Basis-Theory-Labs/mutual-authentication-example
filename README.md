# Mutual Authentication (Two-way SSL) Example

Mutual authentication, also known as two-way authentication, is a security process where both the client and server verify each other's identities using digital certificates. This dual verification enhances communication security, reduces the risk of impersonation, and establishes a trusted and encrypted channel for data exchange, commonly applied in sensitive online transactions and secure network environments.

This repository shows how to connect to an API that requires Mutual Authentication in [Basis Theory Reactors](https://developers.basistheory.com/docs/concepts/what-are-reactors).

## Run this Example

Follow the steps below to create a new Reactor:

1. Make sure to update `reactor.js` to conform to the target API specs (URL, headers, etc.).

2. [Create a new Management Application](https://portal.basistheory.com/applications/create?name=Terraform&permissions=application%3Acreate&permissions=application%3Aread&permissions=application%3Aupdate&permissions=application%3Adelete&permissions=reactor%3Acreate&permissions=reactor%3Aread&permissions=reactor%3Aupdate&permissions=reactor%3Adelete&type=management) with full `application` and `reactor` permissions.

3. Paste the API key to a new `terraform.tfvars` file at this repository root:

    ```terraform
    # Basis Theory Management Application Key
    management_api_key = "key_W8wA8CmcbwXxJsomxeWHVy"
    ```

4. Initialize Terraform:

    ```shell
    terraform init
    ```

5. Run Terraform to provision all the required resources:

    ```shell
    terraform apply
    ```

Using the outputs from Terraform, you can make a request to the Proxy:

```curl
curl -L 'https://api.basistheory.com/reactors/{mutual_auth_reactor_id}/react' \
-H 'BT-API-KEY: {backend_application_key}' \
-H 'Content-Type: application/json' \
-d '{ "token": "hello world" }'
```

> ⚠️ Make sure to replace the keys above with the appropriated values.
