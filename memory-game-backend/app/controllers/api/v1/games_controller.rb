class Api::V1::GamesController < ApplicationController
    def index
        @games = Game.all.each do |game| 
            if game.score == nil
                game.score = 0
            end 
        end
        @games = @games.max_by(10) { |game| game.score }
      
        render json: @games, except: [:created_at, :updated_at]
    end

    def create
        @game = Game.create!(game_params)
        render json: @game
    end 

    def destroy
        @game = Game.find(params[:id])
        @game.destroy
        @games = Game.all.max_by(10) { |game| game.score }
        render json: @games, except: [:created_at, :updated_at]
    end 

    private

    def game_params
        params.require(:game).permit(:username, :score, :card_set_id)
    end 
end
