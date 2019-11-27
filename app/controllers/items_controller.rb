class ItemsController < ApplicationController

  def index
    # トップページ
    @items = Item.includes(:images).limit(10).order("created_at DESC")
    @images = Image.all
  end
    



  def show
    @item = Item.find(params[:id])

  end

  def new
    # 商品出品
    @item = Item.new
    image = @item.images.build
    # binding.pry

    # @item = Item.new
    # @item_image = @item.images.build

    #商品カテゴリー
    @category_parent_array = ["---"]
    # Categorie.where(ancestry: nil).each do |parent|
    #   @category_parent_array << parent.name
    # end
  end


  def create
    #商品出品
    # binding.pry
    @item = Item.create(item_params)
    if @item.save
      redirect_to action: :index
    else
      redirect_to action: :new
    end
  end



  def edit
    # @item = Item.find(params[:id])
  end

  def update
    if @item.update(update_item_params)
      redirect_to root_path
    else
      redirect_to edit_item_path
    end
  end

  def destroy
    # if @item.user_id == current_user.id && @item.destroy
    #   redirect_to root_path
    # else
    #   redirect_to action: :show
    # end
  end

  def purchase
    #購入
  end


  private
  def set_item
    #itemのidを持ってくる
    @item = Item.includes(:images).find(params[:id])
  end
  
  def item_params
    #出品itemのparams
    params.require(:item).permit(:cost_burden, :period_before_shipping, :prefecture_id, :name, :body, :status, :order_status, :price, :shipping_method,
    images_attributes: [:image]).merge(user_id: current_user.id)
  end
  
  def exihibited_lists
      @items = Item.where(user_id: cuuret_user)
  end

  def exihibited
    @item = Item.find(params[:id])
  end
end