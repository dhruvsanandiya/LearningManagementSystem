using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace LMS.API.Hubs;

[Authorize]
public class ChatHub : Hub
{
    public async Task SendMessageToCourse(int courseId, string user, string message)
    {
        await Clients.Group($"course_{courseId}").SendAsync("ReceiveMessage", user, message, DateTime.UtcNow);
    }

    public async Task JoinCourse(int courseId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"course_{courseId}");
        await Clients.Group($"course_{courseId}").SendAsync("UserJoined", Context.User?.Identity?.Name ?? "Anonymous");
    }

    public async Task LeaveCourse(int courseId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"course_{courseId}");
        await Clients.Group($"course_{courseId}").SendAsync("UserLeft", Context.User?.Identity?.Name ?? "Anonymous");
    }

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await base.OnDisconnectedAsync(exception);
    }
}

