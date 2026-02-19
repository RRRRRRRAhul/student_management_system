from rest_framework.permissions import BasePermission, SAFE_METHODS

class AdminCreateOnly(BasePermission):
    def has_permission(self, request, view):
        # everyone can read the data from queryset
        if request.method in SAFE_METHODS:
            return True
        
        # but only admin can ceate the data 
        return request.user.is_staff
    
class IsOwnerStudent(BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.user == request.user:
            return True
        


