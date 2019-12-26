class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all.with_attached_photo.with_attached_audio_file.includes(:user)
    render "api/tracks/index"
  end

  def show
    @track = Track.find_by(id: params[:id])

    if @track
      render "api/tracks/show"
    else
      render json: ['No track found'], status: 422
    end
  end
end
