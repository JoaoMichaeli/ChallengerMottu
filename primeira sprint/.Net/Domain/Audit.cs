using VisionHive.Domain.Enums;

namespace VisionHive.Domain
{
    public class Audit
    {
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime DateModified { get; set; } = DateTime.UtcNow;
        public StatusType Status { get; protected set; } = StatusType.Ativo;
    }
}
