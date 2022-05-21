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
  post "/new-pantry", to: "users#create_new_pantry"
  post "/new-recipe", to: "users#create_new_recipe"

  get "/user-library", to: "users#show_recipe_library"
  get "/user-pantries", to: "users#show_user_pantries"
  get "/pantries/:id/ingredients", to: "pantries#show_pantry_ingredients"

  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
