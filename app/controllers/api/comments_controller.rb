class Api::FriendsController < ApplicationController
	def create
		@comment = Comment.new(comment_params)

		if @comment.save
			render json: @comment
		else
			render json: @comment.errors.full_messages, status: :unprocessable_entity
		end
	end

	def index
		@comments = Comment.where(transaction_id: params[:transaction_id])
		render json: @comments
	end

	# def show
	# 	@comment = Comment.find(params[:id])
	# 	render json: @comment
	# end

	def destroy
		@comment = Comment.find(params[:id])
		@comment.destroy
		render json: {}
	end

	#perhaps add update later

	private
		def comment_params
			params.require(:comment).permit(:content, :transaction_id)
		end
end