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
  post "/pantries/:id/ingredients", to: "pantries#create_new_pantry_ingredient"

  get "/user-library", to: "users#show_recipe_library"
  get "/public-recipes", to: "recipes#show_public_recipes"
  get "/user-pantries", to: "users#show_user_pantries"
  get "/pantries/:id/ingredients", to: "pantries#show_pantry_ingredients"
  get "/recipes/:id/ingredients", to: "recipes#show_recipe_ingredients"
  get "/recipe-author/:id", to: "users#get_recipe_author"
  get "/user_active_pantries", to: "users#show_user_active_pantries"


  delete "/recipe/:id", to: "users#remove_recipe_from_library"

  patch "/user_pantries/:id/activate", to: "user_pantries#handle_activate_pantry"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
