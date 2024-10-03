using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Data;
using TaskManager.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.VisualBasic;

namespace TaskManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;

        public TasksController(TaskContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            return await _context.TaskDtos.ToListAsync();
        }

        // GET: api/tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var taskDto = await _context.TaskDtos.FindAsync(id);

            if (taskDto == null)
            {
                return NotFound();
            }

            return taskDto;
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskDto>> PostTask(TaskDto taskDto)
        {
            if (taskDto.DueDate < DateTime.UtcNow)
            {
                return BadRequest("La fecha de vencimiento no puede ser en el pasado.");
            }

            _context.TaskDtos.Add(taskDto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = taskDto.Id }, taskDto);
        }

        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, TaskDto taskDto)
        {
            if (id != taskDto.Id)
            {
                return BadRequest();
            }

            if (taskDto.DueDate < DateTime.UtcNow)
            {
                return BadRequest("La fecha de vencimiento no puede ser en el pasado.");
            }

            _context.Entry(taskDto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/task/{id}/complete
        [HttpPut("{id}/complete")]
        public IActionResult CompleteTask(int id)
        {
            var task = _context.TaskDtos.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();  // Esto produce el error 404
            }

            task.IsCompleted = true;
            _context.SaveChanges();

            return NoContent();  // O puedes devolver la tarea actualizada
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var taskDto = await _context.TaskDtos.FindAsync(id);
            if (taskDto == null)
            {
                return NotFound();
            }

            _context.TaskDtos.Remove(taskDto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.TaskDtos.Any(e => e.Id == id);
        }
    }
}
