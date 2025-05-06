using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisionHive.Infrastructure.Persistence;

namespace VisionHive.Infrastructure.Mappings
{
    public class MotoMapping: IEntityTypeConfiguration<Moto>
    {
        public void Configure(EntityTypeBuilder<Moto> builder)
        {
            builder
                .ToTable("Motos");

            builder
                .HasKey(m => m.Id);

            builder
                .Property(m => m.Placa)
                .HasMaxLength(10); // Ex: ABC1234

            builder
                .Property(m => m.Chassi)
                .HasMaxLength(20);

            builder
                .Property(m => m.EstaComLote)
                .HasConversion<int>()
                .IsRequired();

            builder
                .Property(m => m.Categoria)
                .HasConversion<string>() // salva o enum como string no banco
                .IsRequired();

            builder
                .Property(m => m.DateCreated)
                .IsRequired()
                .HasColumnType("DATE");
            builder
                .Property(m => m.DateModified)
                .IsRequired()
                .HasColumnType("DATE");

            builder
                .Property(m => m.Status)
                .IsRequired()
                .HasConversion<int>();
        }
    }
}
