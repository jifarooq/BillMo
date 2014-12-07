class MessagesController < ApplicationController
  def new
    @message = Message.new
    render :message_new
  end

  def create
    @message = Message.new(message_params)

    if @message.save
    	flash[:notice] = 'Message sent!'
    	redirect_to :root
    else
      render :message_new
    end
  end

  private
    def message_params
      params.require(:message).permit(:body)
    end
end
