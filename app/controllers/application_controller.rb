class ApplicationController < ActionController::API
  before_action :authorize
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound,with: :render_not_found


  private

  def authorize
    return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
  end

  def render_not_found
    render json:{
     error: "#{controller_name.classify} not found"
     },
     status: :not_found
    end


end
