class Pin < ActiveRecord::Base
  has_many :contents
  belongs_to :trail
  has_many :current_users,
    class_name: 'User',
    foreign_key: 'current_pin_id'
  has_many :texts, dependent: :destroy
  has_many :audios, dependent: :destroy
  has_many :images, dependent: :destroy
  has_many :videos, dependent: :destroy


  accepts_nested_attributes_for :texts, :reject_if => proc { |text| text[:content].blank? }, allow_destroy: true
  accepts_nested_attributes_for :audios, :reject_if => proc { |audio| audio[:attachment].blank? }, allow_destroy: true
  accepts_nested_attributes_for :images, :reject_if => proc { |image| image[:attachment].blank? }, allow_destroy: true
  accepts_nested_attributes_for :videos, :reject_if => proc { |video| video[:attachment].blank? }, allow_destroy: true
end