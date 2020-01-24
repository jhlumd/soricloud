class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all.with_attached_photo.with_attached_audio_file.includes(:user)
    render "api/tracks/index"
  end

  def show
    @track = Track.joins(:comments).where("comments.parent_cmt_id IS NULL").find_by(id: params[:id]) || Track.find_by(id: params[:id])
    if @track
      render "api/tracks/show"
    else
      render json: ['No track found'], status: 422
    end
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      render "api/tracks/show"
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def update
    @track = Track.find_by(id: params[:track][:id])

    if @track.update(track_params)
      render "api/tracks/show"
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def destroy
    track = Track.find_by(id: params[:id])
    track.destroy
    render json: { id: params[:id] }
  end

  private

  def track_params
    params.require(:track).permit(:title, :private, :user_id, :genre, :description, :tags, :photo, :audio_file)
  end
end
