using Microsoft.EntityFrameworkCore;
using VisionHive.Infrastructure.Mappings;
using VisionHive.Infrastructure.Persistence;

namespace VisionHive.Infrastructure.Contexts
{
    public class MotoContext(DbContextOptions<MotoContext> options) : DbContext(options)
    {
        public DbSet<Moto> Motos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MotoMapping());

            base.OnModelCreating(modelBuilder);
        }

     

    }
}
