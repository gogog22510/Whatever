package whatever.utils;

import akka.actor.ActorRef;
import akka.pattern.Patterns;
import akka.util.Timeout;
import scala.concurrent.Await;
import scala.concurrent.Future;
import whatever.data.NullValue;

import java.time.Duration;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public interface ActorDSL {

    static Optional<Object> ask(ActorRef actorRef, Object message, Duration askTimeout) throws TimeoutException, InterruptedException {
        Timeout timeout = new Timeout(askTimeout.toMillis(), TimeUnit.MILLISECONDS);
        Future<Object> future = Patterns.ask(actorRef, message, timeout);
        Object res = Await.result(future, timeout.duration());
        if (res instanceof NullValue) {
            return Optional.empty();
        }
        return Optional.ofNullable(res);
    }
}
