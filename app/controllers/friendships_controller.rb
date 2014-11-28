class FriendshipsController < ApplicationController

	#need to move this into friends_controller and do it front-end!

	def create
		@friendship = current_user.friendships.new(friendship_params)
		@friendship.try(:save)
		render json: {} #placeholder
	end

	def destroy
		@paid_trans = current_user.friendships.find_by_friend_id(params[:id])
		@paid_trans.try(:destroy)
		render json: {}
	end

  private
  
  	def friendship_params
  		params.require(:friendship).permit(:user_id, :friend_id)
  	end
end