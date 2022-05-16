class PantrySerializer < ActiveModel::Serializer
  attributes :id, :pantry_name, :pantry_description, :is_shared
end
