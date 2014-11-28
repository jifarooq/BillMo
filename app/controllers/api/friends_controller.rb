class Api::FriendsController < ApplicationController
	def index
		@friends = current_user.friends
		render json: @friends
	end
end