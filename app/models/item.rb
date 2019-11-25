class Item < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  # delegate :name, to: :prefecture

  has_many :images
  accepts_nested_attributes_for :images
end