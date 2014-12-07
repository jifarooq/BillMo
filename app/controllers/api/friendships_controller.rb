class Api::FriendshipsController < ApplicationController
	def create
		@friendship = current_user.friendships.new(
			friend_id: params[:friend_id]
		)
		@friendship.try(:save)
		render json: @friendship
	end

	def destroy
		@friendship = current_user.friendships.find_by_friend_id(params[:id])
		@friendship.try(:destroy)
		render json: {}
	end

	def index
		@friendships = current_user.friendships
		render json: @friendships
	end

  private
  	def friendship_params
  		params.require(:friendship).permit(:user_id, :friend_id)
  	end
end