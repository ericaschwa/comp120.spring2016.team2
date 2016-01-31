require 'data_mapper'
require 'dm-mysql-adapter'
require 'dm-timestamps'

username = ENV['DIRT_USERNAME']
password = ENV['DIRT_PASSWORD']
host     = ENV['DIRT_HOST']
database = ENV['DIRT_DATABASE']

DataMapper.setup :default, "mysql://#{username}:#{password}@#{host}/#{database}"

class Incident
  include DataMapper::Resource

  property :id, Serial
  property :severity, Integer, :min => 0, :max => 3
  property :status, Integer, :min => 0, :max => 2, :default => 0

  property :created_at, DateTime

  has 1, :user
  has n, :departments
end

class User
  include DataMapper::Resource
  
  property :id, Serial
end

class IncidentType
  include DataMapper::Resource
  
  property :id, Serial
  property :name, String
end

class Department
  include DataMapper::Resource
  
  property :id, Serial
  property :name, String
end


DataMapper.finalize.auto_upgrade!
