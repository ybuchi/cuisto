class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :username, :birthday, :bio, :created_at, :recipes_cooked
end
