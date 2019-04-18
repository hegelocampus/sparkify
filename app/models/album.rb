class Album < ApplicationRecord
  validates :title, :genre, :year, presence: true

  belongs_to :artist
  has_many :songs
end
