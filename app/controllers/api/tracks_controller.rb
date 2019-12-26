class Api::TracksController < ApplicationController
  def show
    @track = Track.find_by(id: params[:id])

    if @track
      render "api/tracks/show"
    else
      render json: ['No track found'], status: 422
    end
  end
end
