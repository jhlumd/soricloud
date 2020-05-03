class Api::UsersController < ApplicationController

  def check_email
    @user = User.find_by(email: params[:loginInput]) || User.find_by(username: params[:loginInput])

    if @user
      render json: {loginInput: params[:loginInput], loginType: 'login'}
    elsif is_email?(params[:loginInput]) 
      render json: {loginInput: params[:loginInput], loginType: 'signup'}
    else
      render json: ['Enter a valid email address or username.'], status: 422
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])

    if @user 
      render "api/users/showpage"
    else
      render json: ['That user does not exist.'], status: 422
    end
  end
  
  def update
    @user = User.find_by(id: params[:user][:id]) || User.find_by(email: params[:user][:email])
    if @user.update(user_params)
      render "api/users/showpage"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :photo)
  end

  def is_email?(loginInput) 
    loginInput.include?('@') && loginInput.include?('.')
  end
end
