FROM mcr.microsoft.com/dotnet/core/sdk AS build-env
WORKDIR /app

RUN mkdir -p /app
COPY . /app

RUN dotnet publish --configuration Release /app/WebApi/WebApi.csproj



FROM mcr.microsoft.com/dotnet/core/aspnet
WORKDIR /app

ENV PSQL_HOST=
ENV PSQL_PORT=
ENV PSQL_DATABASENAME=
ENV PSQL_USER=
ARG GIT_HASH=
ENV GIT_HASH=$GIT_HASH

COPY --from=build-env /app/_output .
EXPOSE 50805
CMD ["dotnet", "/app/Plum.WebApi.dll"]
