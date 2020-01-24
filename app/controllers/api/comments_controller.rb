class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.all.where(track_id: params[:track_id])
    render :index
  end

  def create
    @comment = Comment.new(track_params);
    if @comment.save 
      render "api/comments/show"
    else 
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    comment = Comment.find_by(id: params[:id])
    comment.destroy
    render json: {id: comment.id, parent_cmt_id: comment.parent_cmt_id, track_id: comment.track_id}
  end

  private

  def track_params 
    params.require(:comment).permit(:body, :user_id, :track_id, :parent_cmt_id, :track_time)
  end
end
