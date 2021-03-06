class NodesController < ApplicationController

      # GET /nodes
      def index
        @nodes = Node.all
        json_response(@nodes)
      end
  
      # POST /nodes
      def create
        @node = Node.create!(node_params)
        json_response(@node, :created)
      end
    
      # GET /nodes/:id
      def show
        set_node()
        json_response(@node)
      end

      # GET /quest/:quest_id/nodes
      def quest_nodes
        @nodes = Node.where(quest_id: params[:quest_id])
        json_response(@nodes) 
      end
    
      # PUT /nodes/:id
      def update
        set_node()
        @node.update(node_params)
        # @json_response("Node updated succesfully!")
        # # head :no_content
      end
    
      # DELETE /nodes/:id
      def destroy
        @node.destroy
        head :no_content
      end
    
      private
    
      def node_params
        # whitelist params
        params.permit(:title, :description, :quest_id, :is_complete?, :date_finished, :id, :node)
      end
    
      def set_node
        @node = Node.find(params[:id])
      end

end
