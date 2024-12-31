from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class UserListView(APIView):
    def get(self, request):
        data = {
            "users": [
                {"id": 1, "name": "DJ John"},
                {"id": 2, "name": "DJ Sarah"}
            ]
        }
        return Response(data, status=status.HTTP_200_OK)

