using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using VisionHive.DTO;
using VisionHive.Infrastructure.Contexts;
using VisionHive.Infrastructure.Persistence;

namespace VisionHive.Controllers
{
    [Route("api/[controller]")]
    [Tags("Motos")]
    [ApiController]
    public class MotosController : ControllerBase
    {
        private readonly MotoContext _context;

        public MotosController(MotoContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retorna uma lista de motos
        /// </summary>
        /// <remarks>
        /// Exemplo de Solicitação:
        /// 
        ///     GET api/motos
        /// 
        /// </remarks>
        /// <response code = "200"> Retorna uma lista de motos</response>
        /// <response code = "500"> Erro interno do servidor</response>
        /// <response code = "503"> Serviço indisponível</response>
        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.ServiceUnavailable)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<ActionResult<IEnumerable<Moto>>> GetMotos()
        {
            return await _context.Motos.ToListAsync();
        }

        // GET: api/Motos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Moto>> GetMoto(Guid id)
        {
            var moto = await _context.Motos.FindAsync(id);

            if (moto == null)
            {
                return NotFound();
            }

            return moto;
        }

        // POST: api/Motos
        [HttpPost]
        public async Task<ActionResult<Moto>> PostMoto(MotoRequest motoRequest)
        {
            var moto = Moto.Create(
                motoRequest.Placa,
                motoRequest.Chassi,
                motoRequest.EstaComLote,
                motoRequest.Categoria
            );

            _context.Motos.Add(moto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMoto", new { id = moto.Id }, moto);
        }

        // PUT: api/Motos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMoto(Guid id, MotoRequest motoRequest)
        {
            var moto = await _context.Motos.FindAsync(id);
            if (moto == null)
            {
                return NotFound();
            }

            moto.AtualizarDados(
                motoRequest.Placa,
                motoRequest.Chassi,
                motoRequest.EstaComLote,
                motoRequest.Categoria
            );

            _context.Entry(moto).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/Motos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMoto(Guid id)
        {
            var moto = await _context.Motos.FindAsync(id);
            if (moto == null)
            {
                return NotFound();
            }

            _context.Motos.Remove(moto);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
