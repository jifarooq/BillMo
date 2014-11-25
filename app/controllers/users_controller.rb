class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def update

  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to users_url
  end

  private
    def user_params
      params.require(:user).permit(:username, :password)
    end
end
