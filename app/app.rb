require 'sinatra'
require 'sinatra/json'
require './db'

get '/' do
  json Incident.all
end

post '/incident/new' do
  incident = Incident.create(:description => params[:description],
                             :severity => params[:severity],
                             :status => params[:status],
                             :user_id => 1)

  if incident.saved?
    return "Incident created"
  else
    return "Failed to create incident"
  end
end
