class UserLibrarySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :recipe_id
end
