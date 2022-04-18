# The Do-Good Club Shopify Application

## Project Background

The world is in a state. With higher rates of homelessness, unemployment and some of the
worst natural disasters in history popping out from every corner of the globe, organizations
around the world are struggling to keep up.

The Do Good Club encourages small businesses and entrepreneurs to assign a dollar value to
their invoices and then donate that amount at the end of the month. By motivating more people to give back in
small ways, we can make a big difference!

## Key Objectives
• Allow users to easily track their monthly donations

• Remind users to make donations locally

• Allow users to show their social impact to their customers

• Increase donations to local organizations outside peak times

• Allow Do Good Admins to see data about donations across all installs

## Requirements

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- **If you are not using the Shopify CLI**, in the Partner dashboard, [create a new app](https://help.shopify.com/en/api/tools/partner-dashboard/your-apps#create-a-new-app). You’ll need this app’s API credentials during the setup process.

## Installation

Using the [Shopify CLI](https://github.com/Shopify/shopify-cli) run:

```sh
shopify app create node -n APP_NAME
```

Or, you can run `npx degit shopify/shopify-app-node` and create a `.env` file containing the following values:

```yaml
SHOPIFY_API_KEY={api key}           # Your API key
SHOPIFY_API_SECRET={api secret key} # Your API secret key
SCOPES={scopes}                     # Your app's required scopes, comma-separated
HOST={your app's host}              # Your app's host, without the protocol prefix
```

