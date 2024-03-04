package com.example.vitanova.Controller;

import com.example.vitanova.Entities.WorkoutSession;
import com.example.vitanova.Service.WorkoutSessionServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/workoutSessions")
public class WorkoutSessionController {
    @Autowired
    private WorkoutSessionServiceImpl workoutSessionService;

    @GetMapping
    public List<WorkoutSession> getAllWorkoutSessions() {
        return workoutSessionService.getAllWorkoutSessions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutSession> getWorkoutSessionById(@PathVariable Long id) {
        WorkoutSession workoutSession = workoutSessionService.getWorkoutSessionById(id);
        return ResponseEntity.ok().body(workoutSession);
    }

    @PostMapping
    public WorkoutSession createWorkoutSession(@RequestBody WorkoutSession workoutSession) {
        return workoutSessionService.createWorkoutSession(workoutSession);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutSession> updateWorkoutSession(@PathVariable Long id, @RequestBody WorkoutSession workoutSessionDetails) {
        WorkoutSession updatedWorkoutSession = workoutSessionService.updateWorkoutSession(id, workoutSessionDetails);
        return ResponseEntity.ok(updatedWorkoutSession);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkoutSession(@PathVariable Long id) {
        workoutSessionService.deleteWorkoutSession(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{workoutSessionId}/addExercises")
    public ResponseEntity<WorkoutSession> addExercisesToSession(@PathVariable Long workoutSessionId, @RequestBody Set<Long> exerciseIds) {
        WorkoutSession updatedWorkoutSession = workoutSessionService.addExercisesToSession(workoutSessionId, exerciseIds);
        return ResponseEntity.ok(updatedWorkoutSession);
    }
}
