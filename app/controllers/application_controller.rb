class ApplicationController < ActionController::API
  before_action :authorize
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid,with: :render_invalid



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
  def  render_invalid(error_obj)
    render json:{
     errors: error_obj.record.errors.full_messages
     },
     status: :unprocessable_entity
  end


end
