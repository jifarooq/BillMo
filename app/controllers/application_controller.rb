class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def current_user
  	User.find_by_token(session[:token])
  end

  def logged_in?
  	!!current_user
  end

  def sign_in!(user)
  	session[:token] = user.reset_token!
  	redirect_to user_url(user)
  end

  def sign_out
  	current_user.reset_token!
  	session[:token] = nil
  	redirect_to new_session_url
  end

  private
    def require_login!
      redirect_to new_session_url unless logged_in?
    end
end
