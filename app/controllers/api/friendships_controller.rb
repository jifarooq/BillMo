class Api::FriendshipsController < ApplicationController
	# before_action :allow_cross_domain

	def create
		@friendship = current_user.friendships.new(friendship_params)
		@friendship.try(:save)
		render json: @friendship
	end

	def destroy
		@friendship = current_user.friendships.find(params[:id])
		@friendship.try(:destroy)
		render json: {}
	end

	def index
		@friendships = current_user.friendships
		render json: @friendships
	end

	# def allow_cross_domain
	# 	response.headers['Access-Control-Allow-Origin'] = true
	# 	response.headers['Access-Control-Allow-Methods'] = 'POST, DELETE'
	# end

  private
  	def friendship_params
  		params.require(:friendship).permit(:user_id, :friend_id)
  	end
end