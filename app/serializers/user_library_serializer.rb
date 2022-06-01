class UserLibrarySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :recipe_id, :times_cooked
end
