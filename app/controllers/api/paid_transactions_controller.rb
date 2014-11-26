class Api::PaidTransactionsController < ApplicationController

	def create 
		@paid_trans = current_user.paid_transactions.Transaction.new(trans_params)

		if @paid_trans.save
			current_user.balance -= @paid_trans.amount
			current_user.save
			render json: @paid_trans
		else
			render json: @paid_trans.errors.full_messages, status: :unprocessable_entity
		end
	end

	def index
		@all_paid_trans = current_user.paid_transactions
		# user jbuilder to add payer and receiver to transaction
		render :index
		# json: @all_paid_trans
	end

	def show
		@paid_trans = current_user.paid_transactions.find(params[:id])
		render json: @paid_trans
	end

	def destroy
		@paid_trans = current_user.paid_transactions.find(params[:id])
		@paid_trans.try(:destroy)
		render json: {}
	end

	private

	def trans_params
		params.require(:transaction).permit(:amount, :note, :payer_id, :receiver_id)
	end

end