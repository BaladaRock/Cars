
using Cars.Server.Context;
using Cars.Server.Repositories.Contracts;
using Cars.Server.Repositories;
using System.Text.Json.Serialization;

namespace Cars.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddSingleton<CarContext>();
            builder.Services.AddScoped<ICarRepository, CarRepository>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Used this to make sure the enum members are serialized as string
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            //app.UseCors(options =>
            //    options.WithOrigins("http://localhost:5274")
            //            .AllowAnyMethod()
            //            .AllowAnyHeader());
            //builder.Services.AddCors();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
