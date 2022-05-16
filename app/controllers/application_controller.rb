class ApplicationController < ActionController::API
  before_action :authorize
  include ActionController::Cookies

  private

  def authorize
    return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
  end


end
