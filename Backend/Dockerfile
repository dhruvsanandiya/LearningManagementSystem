FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["LMS.API/LMS.API.csproj", "LMS.API/"]
COPY ["LMS.Application/LMS.Application.csproj", "LMS.Application/"]
COPY ["LMS.Domain/LMS.Domain.csproj", "LMS.Domain/"]
COPY ["LMS.Infrastructure/LMS.Infrastructure.csproj", "LMS.Infrastructure/"]
RUN dotnet restore "LMS.API/LMS.API.csproj"
COPY . .
WORKDIR "/src/LMS.API"
RUN dotnet build "LMS.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LMS.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LMS.API.dll"]

