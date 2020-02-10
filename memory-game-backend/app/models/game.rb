class Game < ApplicationRecord
    belongs_to :card_set
    validates :username, uniqueness: true, presence: true
end
