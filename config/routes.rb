Rails.application.routes.draw do
  
  resources :pantries
  resources :user_libraries
  resources :user_pantries
  resources :pantry_ingredients
  resources :recipe_ingredients
  resources :ingredients
  resources :recipes
  resources :users

   # Custom routes for login/logout
   post "/login", to: "sessions#create"
   delete "/logout", to: "sessions#destroy"
   # Custom route to stay logged in
  get "/auth", to: "sessions#show"

  post "/store-user-recipe", to: "users#store_recipe"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
